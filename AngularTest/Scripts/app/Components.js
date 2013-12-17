angular.module('components', [])

.directive('screen', function () {
    return {
        restrict: 'E',
        transclude: true,
        controller: ['$scope', '$element', function ($scope, $element) {
            var steps = $scope.steps = nData = activityData;
            this.addStep = function (step) {
                steps.push(step);
            }
        }],
        template:
            '<div class="step" ng-repeat="step in steps">'+
            '       <step step="step"></step>' +
            '</div>',
        replace: true
    };
})

.directive('step', ['$compile', function ($compile) {
    var mainTemplate = 
        '<div class="panel panel-primary" ng-show="isVisible()">' +
        '    <div class="panel-heading">{{step.title}}</div>' +
        '    <div class="panel-body">' +
        '       &content&' +
        '    </div>'+
        '</div>';
    var textTemplate = '<bb-text data="step.data"></bb-text>';
    var gridTemplate = '<bb-grid data="step.data">This is Grid Data</bb-grid>';
    var bigTextTemplate = '<bb-text-area data="step.data"></bb-text-area>';
    var radioTemplate = '<bb-radio data="step.data"></bb-radio>';
    var checkboxTemplate = '<bb-checkbox data="step.data"></bb-checkbox>';

    var getTemplate = function (contentType) {
        var template = '';

        switch (contentType) {
            case 'text':
                template = mainTemplate.replace("&content&", textTemplate);
                break;
            case 'bigtext':
                template = mainTemplate.replace("&content&", bigTextTemplate);
                break;
            case 'grid':
                template = mainTemplate.replace("&content&", gridTemplate);
                break;
            case 'radio':
                template = mainTemplate.replace("&content&", radioTemplate);
                break;
            case 'checkbox':
                template = mainTemplate.replace("&content&", checkboxTemplate)
                break;
        }
        return template;
    }

    var linker = function (scope, element, attrs) {
        console.log('entering Linker: ' + scope.step.data.type);
        element.html(getTemplate(scope.step.data.type));
        console.log('Linker :: compiling...');
        $compile(element.contents(), attrs)(scope);
        console.log('Linker :: done...');
    }

    var result = {
        require: '^screen',
        restrict: 'E',
        transclude: true,
        link: linker,
        scope: { step: '=' },
        replace: true,
        controller: ['$scope', '$element', function ($scope, $element)
        {
            console.log('entering Step Controller: ' + $scope.step.data.type);

            $scope.isVisible = function ()
            {
                if ($scope.step.showRule != null && typeof($scope.step.showRule) != "undefined")
                {
                    var result = eval('this.$root.' + $scope.step.showRule);
                    return result;
                }
                return true;
            }
        }]
    };
    return result;
}])

.directive('bbText', function () {
    return {
        require: '^step',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: { data: '=' },
        controller: ['$scope', '$element', function($scope, $element)
        {
            console.log('entering Block Controller: ' + $scope.data.type);
        }],
        templateUrl: 'bbText.html'
    };
})

.directive('bbTextArea', function () {
    return {
        require: '^step',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: { data: '=' },
        controller: ['$scope', '$element', function($scope, $element)
        {
            console.log('entering Block Controller: ' + $scope.data.type);
        }],
        templateUrl: 'bbTextArea.html'
    };
})

.directive('bbGrid', ['$compile', function ($compile) {
    return {
        require: '^step',
        restrict: 'E',
        transclude: false,
        replace: true,
        scope: { data: '=' },
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
            console.log('entering Grid Controller: ' + $scope.data.type);
            $scope.gridData = $scope.data.source;
            $scope.gridOptions = {
                data: 'gridData',
                enableCellSelection: true,
                enableRowSelection: false,
                enableCellEdit: !$scope.data.readonly,
                columnDefs: [{ field: 'title', displayName: 'Title' }, { field: 'name', displayName: 'Name' }]
            };
        }],
        templateUrl: 'bbGrid.html'
    };
}])

.directive('bbRadio', function () {
    return {
        require: '^step',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: { data: '=' },
        controller: ['$scope', '$element', function ($scope, $element) {
            console.log('entering Radio Block Controller: ' + $scope.data.source[2].options);
        }],
        templateUrl: "bbRadio.html"
    };
})

.directive('bbCheckbox', function () {
    return {
        require: '^step',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: { data: '=' },
        controller: ['$scope', '$element', function ($scope, $element) {
            console.log('entering CheckBox Block Controller: ' + $scope.data.source.text);
        }],
        templateUrl: "bbCheckbox.html"
    };
})

