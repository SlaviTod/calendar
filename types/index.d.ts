interface Timestamps {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

declare enum Voice {
    soprano = "Soprano",
    mezzo = "MezzoSoprano",
    alt = "Contralto"
}

declare enum Role {
    user = "user",
    conductor = "conductor",
    member = "member",
    author = "author",
    admin = "admin"
}

interface User extends Timestamps {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    voice: Voice | undefined;
    isBlocked: boolean;
    avatar: string | null;
}
interface UpdateUserProfileRequest {
    firstName: string;
    lastName: string;
    voice?: Voice | undefined;
}
interface UpdateUserResponse {
    user: User;
}
interface ChangePassRequest {
    oldPass: string;
    password: string;
}
interface ChangePassForm extends ChangePassRequest {
    confirmPassword: string;
}

interface Language {
    id: number;
    label: string;
    code: string;
    imgUrl: string;
}

declare enum PublicEventType {
    event = "event",
    concert = "concert",
    festival = "festival",
    competition = "competition",
    history = "history"
}

interface PublicEvent extends Timestamps {
    id: number;
    eventType: PublicEventType;
    dirName: string;
    start: string;
    end: string;
    durationInMinutes?: number;
    timeZone: string;
    mapLink: string | null;
    embedMapLink: string | null;
    videoLinks: string[];
    images: string[];
    isPublic: boolean;
    CalendarEventDetails: CalendarEventDetails[];
}
interface CalendarEventDetails extends Timestamps {
    id: number;
    LanguageId: number;
    title: string;
    subTitle: string | null;
    description: string;
    dateText: string | null;
    address: string | null;
    city: string | null;
    country: string | null;
}

interface GetEventsResponse {
    events: PublicEvent[];
    totalItems: number;
}
interface GetEventResponse {
    event: PublicEvent;
}

declare enum RepetitiveEvents {
    recurringRehearsal = "recurringRehearsal"
}
declare enum OneTimePrivateEvents {
    rehearsal = "rehearsal",// created with first checked attendance
    oneTimeRehearsal = "oneTimeRehearsal",// extra rehearsal or one that replaces the canceled rehearsal
    canceledRehearsal = "canceledRehearsal",
    trip = "trip",
    publicEvent = "publicEvent",
    other = "other"
}
type PrivateEventType = RepetitiveEvents | OneTimePrivateEvents;
interface PrivateEvent {
    id: number;
    eventType: PrivateEventType;
    title: string;
    description: string;
    address: string;
    city: string;
    country: string;
    mapLink: string;
    start: string;
    end: string;
    durationInMinutes: number;
    timeZone: string;
    asJson: AsJson;
}
interface AsJson {
    dayOfTheWeek?: string;
    startAt?: {
        hour: number;
        minute: number;
    };
}

interface PrivateEventRequest {
    eventType: string;
    title: string;
    description: string;
    address: string;
    city: string;
    country: string;
    mapLink: string;
    start: Date;
    end: Date;
    durationInMinutes: number;
    asJson: string;
}
interface PrivateEventUpdateRequest extends PrivateEventRequest {
    id: number;
}
interface PrivateEventResponse {
    event: PrivateEvent;
}
interface GetPrivateEventsResponse {
    events: PrivateEvent[];
    recurring: PrivateEvent[];
}
interface GetRecurringEventsResponse {
    recurring: PrivateEvent;
}

interface LoginRequest {
    email: string;
    password: string;
}
interface LoginResponse {
    user: User;
    token: string;
}

declare enum ApiRouts {
    languages = "/languages",
    publicEvents = "/events",
    events = "/mobile/events",
    auth = "/mobile/auth",
    users = "/mobile/users"
}
declare enum ApiEndpoints {
    getLng = "get Languages",
    getPublicEvents = "get Public Events",
    login = "login",
    logout = "logout",
    register = "register User",
    updateUserProfile = "update User Profile",
    uploadAvatar = "upload User Avatar",
    changePass = "change Password",
    createEvent = "create private event",
    updateEvent = "update private event",
    deleteEvent = "delete private event",
    getPrivateEvents = "get private events",
    getRecurringEvents = "get recurring events",
    setEventAttendance = "set event attendance"
}
declare enum HTTPmethod {
    get = "GET",
    post = "POST",
    put = "PUT",
    delete = "DELETE"
}
interface HTTPrequest {
    url: ApiRouts;
    method: HTTPmethod;
    needCredentials: boolean;
    params?: string[];
    queryKeys?: string[];
    additionalUrl?: string;
}
type ApiCalls = Record<ApiEndpoints, HTTPrequest>;
declare const ElbetitsaApiCalls: ApiCalls;

interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
interface RegisterForm extends RegisterRequest {
    confirmPassword: string;
}
interface CreateUserResponse {
    user: User;
}

interface RequesterArgs {
    method: HTTPmethod;
    url: string;
    token?: string;
    formData?: FormDataObjectType;
    queryKeys?: string[];
    queries?: QueryObject;
    file?: Blob;
}
type FormDataObjectType = LoginRequest | RegisterRequest | UpdateUserProfileRequest | ChangePassRequest | PrivateEventRequest | PrivateEventUpdateRequest;
type QueryObject = {
    [K: string]: number | string;
};

export { type ApiCalls, ApiEndpoints, ApiRouts, type AsJson, type CalendarEventDetails, type ChangePassForm, type ChangePassRequest, type CreateUserResponse, ElbetitsaApiCalls, type FormDataObjectType, type GetEventResponse, type GetEventsResponse, type GetPrivateEventsResponse, type GetRecurringEventsResponse, HTTPmethod, type HTTPrequest, type Language, type LoginRequest, type LoginResponse, OneTimePrivateEvents, type PrivateEvent, type PrivateEventRequest, type PrivateEventResponse, type PrivateEventType, type PrivateEventUpdateRequest, type PublicEvent, PublicEventType, type RegisterForm, type RegisterRequest, RepetitiveEvents, type RequesterArgs, Role, type Timestamps, type UpdateUserProfileRequest, type UpdateUserResponse, type User, Voice };
