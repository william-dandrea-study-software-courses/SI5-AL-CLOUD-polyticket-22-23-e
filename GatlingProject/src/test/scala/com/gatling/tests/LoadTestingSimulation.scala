package com.gatling.tests

import io.gatling.core.Predef._
import io.gatling.http.Predef._

class LoadTestingSimulation extends Simulation {

  /*
  // protocol
  val httpProtocol = http
    .baseUrl("https://us-central1-cloud-tickets.cloudfunctions.net/event-listing")

  // scenario
  val scn = scenario("Make a get request").exec(
    http("Get all events")
      .get("/all-events")
      .check(status.is(200))
  )

  // setup
  setUp(
    scn.inject(atOnceUsers(400))
      .protocols(httpProtocol)
  )
  */


  // protocol
  val httpProtocol = http
    .baseUrl("https://ticket-booking-idnoihwhaq-uc.a.run.app")

  // scenario
  val scn = scenario("Add a new johnny event ticket in the cart").exec(
    http("Get all events")
      .get("/create-ticket/31")
      .check(
        status.is(200)
      )
  )

  // setup
  setUp(
    scn.inject(atOnceUsers(1000))
      .protocols(httpProtocol)
  )
}
