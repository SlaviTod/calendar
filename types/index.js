// lib/shared/enums/Voice.ts
var Voice = /* @__PURE__ */ ((Voice2) => {
  Voice2["soprano"] = "Soprano";
  Voice2["mezzo"] = "MezzoSoprano";
  Voice2["alt"] = "Contralto";
  return Voice2;
})(Voice || {});

// lib/user/Role.ts
var Role = /* @__PURE__ */ ((Role2) => {
  Role2["user"] = "user";
  Role2["conductor"] = "conductor";
  Role2["member"] = "member";
  Role2["author"] = "author";
  Role2["admin"] = "admin";
  return Role2;
})(Role || {});

// lib/event/EventType.ts
var PublicEventType = /* @__PURE__ */ ((PublicEventType2) => {
  PublicEventType2["event"] = "event";
  PublicEventType2["concert"] = "concert";
  PublicEventType2["festival"] = "festival";
  PublicEventType2["competition"] = "competition";
  PublicEventType2["history"] = "history";
  return PublicEventType2;
})(PublicEventType || {});

// lib/event/PrivateEvent.ts
var RepetitiveEvents = /* @__PURE__ */ ((RepetitiveEvents2) => {
  RepetitiveEvents2["recurringRehearsal"] = "recurringRehearsal";
  return RepetitiveEvents2;
})(RepetitiveEvents || {});
var OneTimePrivateEvents = /* @__PURE__ */ ((OneTimePrivateEvents2) => {
  OneTimePrivateEvents2["rehearsal"] = "rehearsal";
  OneTimePrivateEvents2["oneTimeRehearsal"] = "oneTimeRehearsal";
  OneTimePrivateEvents2["canceledRehearsal"] = "canceledRehearsal";
  OneTimePrivateEvents2["trip"] = "trip";
  OneTimePrivateEvents2["publicEvent"] = "publicEvent";
  OneTimePrivateEvents2["other"] = "other";
  return OneTimePrivateEvents2;
})(OneTimePrivateEvents || {});

// lib/api/endpoints.ts
var ApiRouts = /* @__PURE__ */ ((ApiRouts2) => {
  ApiRouts2["languages"] = "/languages";
  ApiRouts2["publicEvents"] = "/events";
  ApiRouts2["events"] = "/mobile/events";
  ApiRouts2["auth"] = "/mobile/auth";
  ApiRouts2["users"] = "/mobile/users";
  return ApiRouts2;
})(ApiRouts || {});
var ApiEndpoints = /* @__PURE__ */ ((ApiEndpoints2) => {
  ApiEndpoints2["getLng"] = "get Languages";
  ApiEndpoints2["getPublicEvents"] = "get Public Events";
  ApiEndpoints2["login"] = "login";
  ApiEndpoints2["logout"] = "logout";
  ApiEndpoints2["register"] = "register User";
  ApiEndpoints2["updateUserProfile"] = "update User Profile";
  ApiEndpoints2["uploadAvatar"] = "upload User Avatar";
  ApiEndpoints2["changePass"] = "change Password";
  ApiEndpoints2["createEvent"] = "create private event";
  ApiEndpoints2["updateEvent"] = "update private event";
  ApiEndpoints2["deleteEvent"] = "delete private event";
  ApiEndpoints2["getPrivateEvents"] = "get private events";
  ApiEndpoints2["getRecurringEvents"] = "get recurring events";
  ApiEndpoints2["setEventAttendance"] = "set event attendance";
  return ApiEndpoints2;
})(ApiEndpoints || {});
var HTTPmethod = /* @__PURE__ */ ((HTTPmethod2) => {
  HTTPmethod2["get"] = "GET";
  HTTPmethod2["post"] = "POST";
  HTTPmethod2["put"] = "PUT";
  HTTPmethod2["delete"] = "DELETE";
  return HTTPmethod2;
})(HTTPmethod || {});
var ElbetitsaApiCalls = {
  ["get Languages" /* getLng */]: {
    // no 
    url: "/languages" /* languages */,
    method: "GET" /* get */,
    needCredentials: false
  },
  ["get Public Events" /* getPublicEvents */]: {
    url: "/events" /* publicEvents */,
    method: "GET" /* get */,
    needCredentials: false,
    queryKeys: ["languageId", "itemsPerPage", "currentPage", "search"]
  },
  ["login" /* login */]: {
    url: "/mobile/auth" /* auth */,
    method: "POST" /* post */,
    needCredentials: false
  },
  ["logout" /* logout */]: {
    // test 
    url: "/mobile/auth" /* auth */,
    method: "GET" /* get */,
    needCredentials: false,
    params: ["userId"]
  },
  ["register User" /* register */]: {
    // test 
    url: "/mobile/users" /* users */,
    method: "POST" /* post */,
    needCredentials: false
  },
  ["update User Profile" /* updateUserProfile */]: {
    url: "/mobile/users" /* users */,
    method: "PUT" /* put */,
    needCredentials: true,
    params: ["userId"]
  },
  ["upload User Avatar" /* uploadAvatar */]: {
    // TODO 
    url: "/mobile/users" /* users */,
    method: "POST" /* post */,
    needCredentials: true,
    params: ["userId"],
    additionalUrl: "avatar"
  },
  ["change Password" /* changePass */]: {
    url: "/mobile/users" /* users */,
    method: "POST" /* post */,
    needCredentials: true,
    params: ["userId"],
    additionalUrl: "password"
  },
  ["create private event" /* createEvent */]: {
    url: "/mobile/events" /* events */,
    method: "POST" /* post */,
    needCredentials: true
  },
  ["update private event" /* updateEvent */]: {
    url: "/mobile/events" /* events */,
    method: "PUT" /* put */,
    needCredentials: true,
    params: ["eventId"]
  },
  ["delete private event" /* deleteEvent */]: {
    url: "/mobile/events" /* events */,
    method: "DELETE" /* delete */,
    needCredentials: true,
    params: ["eventId"]
  },
  ["get private events" /* getPrivateEvents */]: {
    url: "/mobile/events" /* events */,
    method: "GET" /* get */,
    needCredentials: true,
    queryKeys: ["start", "end"]
    // Dates
  },
  ["get recurring events" /* getRecurringEvents */]: {
    url: "/mobile/events" /* events */,
    method: "GET" /* get */,
    needCredentials: true,
    additionalUrl: "recurring"
  },
  ["set event attendance" /* setEventAttendance */]: {
    url: "/mobile/events" /* events */,
    method: "POST" /* post */,
    needCredentials: true,
    params: ["eventId"],
    additionalUrl: "attendance"
  }
};
export {
  ApiEndpoints,
  ApiRouts,
  ElbetitsaApiCalls,
  HTTPmethod,
  OneTimePrivateEvents,
  PublicEventType,
  RepetitiveEvents,
  Role,
  Voice
};
