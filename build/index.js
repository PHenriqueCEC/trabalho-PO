"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var optimize_route_1 = __importDefault(require("./routes/optimize.route"));
var ProcessCsv_1 = __importDefault(require("./services/ProcessCsv"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
var processCsvService = new ProcessCsv_1.default();
processCsvService.execute();
var port = process.env.PORT || "2030";
app.use("/optimize", optimize_route_1.default);
app.get("/", function (req, res) {
    res.send("Server online");
});
app.listen(3000, function () {
    console.log("[server]: Server is running at http://localhost:" + port);
});
