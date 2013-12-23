using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Serialization;
using System.Web.Http;

namespace AngularTest.Controllers
{
    public class ActivitySvcController : ApiController
    {
        public System.Web.Http.Results.JsonResult<Step> GetValueChange(string aId, string step, string newValue)
        {
            var newStep = new Step
            {
                // this is the current big text implementation
                step = "1.6",
                visible = false,
                data = new BaseData
                {
                    type = "bigtext",
                    Readonly = true,
                    source = "Lorem Ipsum from Server"
                }
            };

            return Json(newStep);
            //return FixedDataToReturn.Replace(Environment.NewLine,"").Trim();
        }

        private static string FixedDataToReturn = @"[{step: '1.6',
                    title: 'Big read only text',
                    visible: false
                    data:
                        {
                            type: 'bigtext',
                            Readonly: true,
                            source: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id venenatis arcu. Quisque bibendum risus sed turpis interdum rutrum. Fusce vel metus ac neque faucibus hendrerit sed eu leo. Vestibulum congue, nisi a pharetra faucibus, ligula urna ultricies enim, et dapibus mi quam et urna. Nunc vel pharetra nulla. Nullam eget quam malesuada dui vulputate ultrices et rhoncus lacus. Proin pulvinar dui pulvinar diam congue, sit amet vulputate ante consectetur. Cras vestibulum rhoncus arcu, nec consectetur diam viverra ullamcorper. Proin vulputate congue vulputate. Suspendisse tincidunt sapien non sapien cursus, nec blandit mi lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam condimentum odio nulla, ac fringilla mi commodo nec. Nullam quis pretium nisl.'
                        }
}]
                ";
    }

    public class Step
    {
        public string step { get; set; }
        public string  title { get; set; }
        public bool visible { get; set; }

        public BaseData data { get; set; }
    }

    public class BaseData
    {
        public string type { get; set; }
        [DataMember(Name="readonly")]
        public bool Readonly { get; set; }
        public object source { get; set; }
    }
}
