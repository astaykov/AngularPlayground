var activityData = [
                {
                    title: "Test",
                    data:
                        {
                            type: 'text',
                            readonly: false,
                            source: 'I come from JSON'
                        }
                },
                {
                    title: "Big Text",
                    data:
                        {
                            type: 'bigtext',
                            readonly: true,
                            source: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id venenatis arcu. Quisque bibendum risus sed turpis interdum rutrum. Fusce vel metus ac neque faucibus hendrerit sed eu leo. Vestibulum congue, nisi a pharetra faucibus, ligula urna ultricies enim, et dapibus mi quam et urna. Nunc vel pharetra nulla. Nullam eget quam malesuada dui vulputate ultrices et rhoncus lacus. Proin pulvinar dui pulvinar diam congue, sit amet vulputate ante consectetur. Cras vestibulum rhoncus arcu, nec consectetur diam viverra ullamcorper. Proin vulputate congue vulputate. Suspendisse tincidunt sapien non sapien cursus, nec blandit mi lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam condimentum odio nulla, ac fringilla mi commodo nec. Nullam quis pretium nisl.'
                        }
                },
                {
                    title: "Test 12",
                    data:
                        {
                            type: 'grid',
                            readonly: false,
                            source:
                                [
                                    {
                                        title: 'One',
                                        name: 'Workbook name'
                                    },
                                    {
                                        title: 'One',
                                        name: 'Workbook name 2'
                                    },
                                ]
                        }
                }
];

var todoApp = angular.module('activityApp', ['components']);

todoApp.controller('TodoListController', function ($scope) {

    $scope.todos = [
        { text: 'learn angular', done: true },
        { text: 'qka', done: false },
        { text: 'rabota', done: false },
        { text: 'build an angular app', done: false }
    ];

    $scope.addTodo = function () {
        $scope.todos.push({ text: $scope.todoText, done: false });
        $scope.todoText = '';
    };


    $scope.remaining = function () {
        var count = 0;
        angular.forEach($scope.todos, function (todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };


    $scope.archive = function () {
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function (todo) {
            if (!todo.done) $scope.todos.push(todo);
        });
    };

    $scope.orderBy = "done";
});