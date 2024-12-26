export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const tagLine = searchParams.get("#");

    if (!userId) {
      return new Response("Missing userId", { status: 400 });
    }

    const response = await fetch(
      `https://api.henrikdev.xyz/valorant/v1/account/${userId}/${tagLine}`,
      {
        method: "GET",
        headers: {
          "X-Riot-Token": process.env.RIOT_API_KEY || "",
        },
      }
    );

    if (!response.ok) {
      return new Response("Riot API error", { status: response.status });
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return new Response(error ? String(error) : "Error", { status: 500 });
  }
}
