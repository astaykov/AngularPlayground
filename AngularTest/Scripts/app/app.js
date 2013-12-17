var activityData = [
                {
                    title: "Editable Text",
                    data:
                        {
                            type: 'text',
                            readonly: false,
                            source: 'I come from JSON'
                        }
                },
                 {
                     title: "Radio Group One",
                     data:
                         {
                             type: 'radio',
                             readonly: false,
                             prefix: 'rgo',
                             value: 'no',
                             source: [
                                      { value: 'yes', text: 'Yes' },
                                      { value: 'no', text: 'No' },
                                      { value: 'na', text: 'Not Selected' }
                             ]
                         }
                 },
                  {
                      title: "Radio Group Two",
                      data:
                          {
                              type: 'radio',
                              readonly: false,
                              prefix: 'rgt',
                              value: 'на',
                              source: [
                                        { value: 'да', text: 'Да' },
                                        { value: 'не', text: 'Не' },
                                        { value: 'на', text: 'Не е избран' }
                              ]
                          }
                  },
                {
                    title: "Big read only text",
                    showRule: "steps[1].data.value == 'yes'",
                    data:
                        {
                            type: 'bigtext',
                            readonly: true,
                            source: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id venenatis arcu. Quisque bibendum risus sed turpis interdum rutrum. Fusce vel metus ac neque faucibus hendrerit sed eu leo. Vestibulum congue, nisi a pharetra faucibus, ligula urna ultricies enim, et dapibus mi quam et urna. Nunc vel pharetra nulla. Nullam eget quam malesuada dui vulputate ultrices et rhoncus lacus. Proin pulvinar dui pulvinar diam congue, sit amet vulputate ante consectetur. Cras vestibulum rhoncus arcu, nec consectetur diam viverra ullamcorper. Proin vulputate congue vulputate. Suspendisse tincidunt sapien non sapien cursus, nec blandit mi lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam condimentum odio nulla, ac fringilla mi commodo nec. Nullam quis pretium nisl.'
                        }
                },
                {
                    title: "Read only grid",
                    data:
                        {
                            type: 'grid',
                            readonly: false,
                            source:
                                [
                                    {
                                        title: 'One',
                                        name: 'new workbook'
                                    },
                                    {
                                        title: 'two',
                                        name: 'Some other workbook'
                                    },
                                ]
                        }
                }
];
var nData;
var todoApp = angular.module('activityApp', ['ngGrid', 'components']);
function dataController($scope, $http) {

    $scope.saveChanges = function (elementToDisplay) {
        var data = angular.toJson($scope.$parent.$root.steps);
        $('#' + elementToDisplay).html('<pre>' + data + '</pre>')
        //$http({
        //    method: 'POST',
        //    url: '/create',
        //    data: $scope.user
        //})
    };
}
dataController.$inject = ['$scope', '$http'];