using QuizWebApi.Models;
using System.Web.Http;

namespace QuizWebApi.Controllers
{
    public class ParticipantController : ApiController
    {
        [HttpPost]
        [Route("api/InsertParticipant")]
        public Participant Insert(Participant model)
        {
            using (DbModel db = new DbModel())
            {
                db.Participants.Add(model);
                db.SaveChanges();
                return model;
            }
        }

        [HttpPost]
        [Route("api/UpdateOutput")]
        public void UpdateOutput(Participant model)
        {
            using (DbModel db = new DbModel())
            {
                db.Entry(model).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
        }
    }
}