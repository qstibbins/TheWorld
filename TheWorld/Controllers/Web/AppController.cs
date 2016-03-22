using System;
using Microsoft.AspNet.Mvc;
using TheWorld.Services;
using TheWorld.ViewModels;
using TheWorld.Models;
using System.Linq;
using Microsoft.AspNet.Authorization;
using System.Collections.Generic;

namespace TheWorld.Controllers.Web
{
    public class AppController : Controller
    {
        private IMailService _mailService;
        private IWorldRepository _repository;

        public AppController(IMailService service, IWorldRepository repository)
        {
            _mailService = service;
            _repository = repository;
        }

        public IActionResult Index()
        {
            return View();
        }

        //[HttpPost]
        public IActionResult GoToTrip()
        {
            var tripName = RouteData.Values["id"].ToString();//.Replace(" ", "");
            var nameForAction = tripName.Replace(" ", "");
            var trip = _repository.GetTripByName(tripName, User.Identity.Name);
            return RedirectToAction(nameForAction, "App",
                new Trip { Name = trip.Name, Created = trip.Created,
                    Id = trip.Id, UserName = trip.UserName, Stops = new List<Stop>(trip.Stops) });
            //return Json(vm);
        }

        public JsonResult USTrip(Trip trip)
        {
            var id = trip;
            return Json(id);
        }

        [Authorize]
        public IActionResult Trips()
        {
            //var trips = _repository.GetAllTrips();
            return View();
        }

        public IActionResult About()
        {
            return View();
        }

        public IActionResult Contact()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Contact(ContactViewModel model)
        {
            if (ModelState.IsValid)
            {
                var email = Startup.Configuration["AppSettings:SiteEmailAddress"];

                if (string.IsNullOrWhiteSpace(email))
                {
                    ModelState.AddModelError("", "Could not send email, configuration problem.");
                }

                if (_mailService.SendMail(email,
                  email,
                  $"Contact Page from {model.Name} ({model.Email})",
                  model.Message))
                {
                    ModelState.Clear();

                    ViewBag.Message = "Mail Sent. Thanks!";

                }
            }

            return View();
        }
    }
}
