"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const t = server_1.initTRPC.create();
const appRouter = t.router({
    hello: t.procedure
        .input(zod_1.z.object({
        name: zod_1.z.string().optional(),
    }))
        .query(({ input }) => {
        return `Hello, ${input.name || 'world'}!`;
    }),
});
exports.default = appRouter;
