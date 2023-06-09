import * as repo from "@/utilities/repository.js";

export async function GET(request, {params}) {
    try {
        const{ id } = params;
        const user = await repo.readUser(id);
        if (user) {
            return Response.json(user, {status: 200});
        }
        
        return Response.json({error: "User Not Found!"}, {status: 404}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function PUT(request, {params}) {
    try {
        const{ id } = params;
        const body = await request.json();

        if(typeof body.first_name === "string" && typeof body.last_name === "string" && typeof body.email === "string" && typeof body.password === "string" && typeof body.role === "string"){
            body.first_name = body.first_name.trim();
            body.last_name = body.last_name.trim();
            body.email = body.email.trim();
            body.password = body.password.trim();
            body.role = body.role.trim();
        }

        if("first_name" in body && "last_name" in body && "email" in body && "password" in body && "role" in body) {
            const user = await repo.updateUser(id, body);

            if (user) {
                return Response.json(user, {status: 200});
            }

            return Response.json({error: "User Not Found!"}, {status: 404}); 
        }
         
        return Response.json({error: "Invalid Parameters Posted"}, {status: 400}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}

export async function DELETE(request, {params}) {
    try {
        const{ id } = params;
        const user = await repo.deleteUser(id);

        if(user) {
            return  Response.json({message: "Deleted User!"}, {status: 200});
        }

        return Response.json({error: "User Not Found!"}, {status: 404}); 
    } catch (error) {
        console.error("error -", error.message);
        return Response.json({message: "Internal server error."}, { status: 500 });
    }
}