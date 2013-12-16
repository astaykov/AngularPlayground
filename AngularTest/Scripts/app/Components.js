angular.module('components', [])

.directive('screen', function () {
    return {
        restrict: 'E',
        transclude: true,
        controller: ['$scope', '$element', function ($scope, $element) {
            var steps = $scope.steps = activityData;
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
        }
        return template;
    }

    var linker = function (scope, element, attrs) {
        console.log('entering Linker: ' + scope.step.data.type);
        element.html(getTemplate(scope.step.data.type));
        console.log('Linker :: compiling...');
        $compile(element.contents())(scope);
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
        template: '<input type="text" class="form-control" png-readonly="data.readonly" ng-model="data.source" />'
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
        template: '<textarea class="form-control" rows="5" ng-readonly="data.readonly" ng-model="data.source"></textarea>'
    };
})

.directive('bbGrid', function () {
    return {
        require: '^step',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: { data: '=' },
        controller: ['$scope', '$element', function ($scope, $element) {
            console.log('entering Grid Controller: ' + $scope.data.type);
        }],
        template:
                '<table class="table-hover table-bordered"><tbody>' +
                    '<tr ng-repeat="row in data.source">' +
                        '<td ng-repeat="col in row">' +
                            '{{col}}' +
                        '</td>' +
                '</tbody></table>' 
    };
})

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