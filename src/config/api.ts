const API_BASE_URL = "https://tasq-backend-6983e4a880d8.herokuapp.com/api";

interface ApiResponse<T> {
  data: T;
  error?: string;
}
export async function fetchApi<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<ApiResponse<T>> {
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  if (params) {
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
  }

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("API Fetch Error:", error);
    return { data: null as any, error: (error as Error).message };
  }
}
