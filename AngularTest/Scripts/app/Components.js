angular.module('components', [])

.directive('screen', function () {
    return {
        restrict: 'E',
        transclude: true,
        controller: function ($scope, $element) {
            var steps = $scope.steps = activityData;
            this.addStep = function (step) {
                steps.push(step);
            }
        },
        template:
            '<div class="step" ng-repeat="step in steps">'+
            '       <step step="step"></step>' +
            '</div>',
        replace: true
    };
})

.directive('step', function ($compile) {
    var mainTemplate = 
        '<div class="panel panel-primary">' +
        '    <div class="panel-heading">{{step.title}}</div>' +
        '    <div class="panel-body">' +
        '       &content&' +
        '    </div>'+
        '</div>';
    var textTemplate = '<bb-text data="step.data"></bb-text>';
    var gridTemplate = '<bb-grid data="step.data">This is Grid Data</bb-grid>';
    var bigTextTemplate = '<bb-text-area data="step.data"></bb-text-area>';

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
        controller: function($scope, $element)
        {
            console.log('entering Step Controller: ' + $scope.step.data.type);
        }
    };
    return result;
})

.directive('bbText', function () {
    return {
        require: '^step',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: { data: '=' },
        controller: function($scope, $element)
        {
            console.log('entering Block Controller: ' + $scope.data.type);
        },
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
        controller: function($scope, $element)
        {
            console.log('entering Block Controller: ' + $scope.data.type);
        },
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
        controller: function ($scope, $element) {
            console.log('entering Grid Controller: ' + $scope.data.type);
        },
        template:
                '<table class="table-hover table-bordered"><tbody>' +
                    '<tr ng-repeat="row in data.source">' +
                        '<td ng-repeat="col in row">' +
                            '{{col}}' +
                        '</td>' +
                '</tbody></table>' 
    };
})