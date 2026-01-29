export async function POST(request: Request) {
  const body = await request.json();
  console.log("Received JSON data:", body);

  return Response.json({ message: "Success", received:  body?.length || 0 });
}