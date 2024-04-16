"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var zmq = require("zeromq");
// Define the port you want to use
var port = process.env.zmq_output || '4001';
// Define the connection type you want to use (tcp, ipc...)
var connectionType = process.env.connection_type || 'tcp';
// Define the host. Default is to publish on all.
var host = process.env.host || '*';
// Set the topic of the stream
var topicfilter = process.env.topic || 'event';
var Publishport = "".concat(connectionType, "://").concat(host, ":").concat(port);
// Create a ZeroMQ publisher socket
var socket = new zmq.Publisher();
var subscriber = new zmq.Subscriber();
// Bind the socket to the Publishport
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, socket.bind(Publishport)];
            case 1:
                _a.sent();
                console.log("Sending on topic: ".concat(topicfilter));
                return [2 /*return*/];
        }
    });
}); })();
function sendEvent() {
    var startEvent = {
        id: 1,
        dtEvent: '2024-12-04',
        level: 'Diversity',
        program: 'Man',
        sport: 'Cricket',
        status: 'OK',
        title: 'CSK Vs MI',
        detail: {
            cityAddress: 'Mohali',
            streetAddress: '12 Kb 18',
            type: 'On Demand Event',
        },
        year: 2024,
        venue: {
            location: 'b24,vikas nagar Ludhiana',
        },
        time: 1211,
        type: 'On Demand Event',
        countdown: '111',
        activeDevice: [
            { id: 1, deviceName: 'oppo hand cam' },
            { id: 2, deviceName: 'iphone 15 Max pro' },
        ],
    };
    socket.send([topicfilter, JSON.stringify(startEvent)]);
}
setTimeout(function () {
    sendEvent();
    setTimeout(function () {
        var msg = { eventStatus: 'Event Stopped' };
        socket.send([topicfilter, JSON.stringify(msg)]);
    }, 10000);
    setTimeout(function () {
        var preview = { eventStatus: 'Event Ready for Preview' };
        socket.send([topicfilter, JSON.stringify(preview)]);
    }, 20000);
}, 4000);
