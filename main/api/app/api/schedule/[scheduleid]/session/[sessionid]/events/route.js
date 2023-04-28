import * as repo from "../../../../repository.js";

export async function GET(request, {params}) {
    try {
        const { scheduleid, sessionid } = params;
        const events = await repo.readEvents(scheduleid, sessionid);
        return Response.json(events, {status: 200});

    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function POST(request, {params}) {
    try {
        const { scheduleid, sessionid } = params;
        const body = await request.json();

        if("id" in body && "title" in body && "presenter" in body && "startTime" in body && "endTime" in body) {
            console.log(body.id)
            const event = await repo.createEvent({
                id: body.id,
                title: body.title,
                presenter: body.presenter,
                startTime: body.startTime,
                endTime: body.endTime
            }, scheduleid, sessionid);
            return Response.json(event, {status: 201});
        }

        return Response.json({error: "Invalid Parameters Posted"}, {status: 400}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}
