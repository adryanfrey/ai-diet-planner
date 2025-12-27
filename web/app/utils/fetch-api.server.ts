type APIResponse<Expected> = {
  message: string;
  result: Expected;
};

type FetchAPIParams = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data: unknown;
  headers?: Record<string, string>;
};

export async function fetchFromAPI<Expected>({
  url,
  method,
  data,
  headers = {
    "Content-Type": "application/json",
  },
}: FetchAPIParams) {
  const apiBaseUrl = process.env.API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API_BASE_URL is not set");
  }

  const fullUrl = `${apiBaseUrl}${url}`;

  const response = await fetch(fullUrl, {
    method,
    body: JSON.stringify(data),
    headers,
    keepalive: true,
  });

  return await parseAPIResponse<Expected>(response);
}

async function parseAPIResponse<Expected>(
  response: Response
): Promise<APIResponse<Expected>> {
  if (!response.ok) {
    throw new Response(
      JSON.stringify({ error: "There was an error calling the API" }),
      {
        status: response.status,
        statusText: response.statusText,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  return response.json().then((data) => {
    return data;
  });
}
