using QuizWebApi.Models;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace QuizWebApi.Controllers
{
    public class QuizController : ApiController
    {
        [HttpGet]
        [Route("api/Questions")]
        public HttpResponseMessage GetQuestions()
        {
            using (DbModel db = new DbModel())
            {
                var questions =  db.Questions.Select(x => new { QuestionId = x.QuestionId, Question = x.Question1, ImageName = x.ImageName, x.Option1, x.Option2, x.Option3, x.Option4 })
                    .OrderBy(y=> Guid.NewGuid())
                    .Take(10)
                    .ToArray();

                var updatedQuestions = questions.AsEnumerable().Select(x => new { QuestionId = x.QuestionId, Question = x.Question, ImageName = x.ImageName, Options = new string[] { x.Option1, x.Option2, x.Option3, x.Option4 } }).ToList();

                return Request.CreateResponse(HttpStatusCode.OK, updatedQuestions);
            }
        }

        [HttpPost]
        [Route("api/Answers")]
        public HttpResponseMessage GetAnswers(int[] questionIds)
        {
            using (DbModel db = new DbModel())
            {
                var result = db.Questions.AsEnumerable().Where(y => questionIds.Contains(y.QuestionId))
                    .OrderBy(x => { return Array.IndexOf(questionIds, x.QuestionId); })
                    .Select(s => s.Answer).ToArray();
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
        }
    }
}