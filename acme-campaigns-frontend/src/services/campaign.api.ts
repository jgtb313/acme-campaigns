const createFetchInstance = (baseURL: string) => {
  return async (
    url: string,
    options: { method: RequestInit["method"]; body?: RequestInit["body"] }
  ) => {
    const response = await fetch(`${baseURL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = null;

    try {
      data = await response.json();
    } catch {
      return;
    }

    return data;
  };
};

export const buildQueryParams = (params: Record<string, any> = {}): string => {
  const queryParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value.toString());
    }
  }

  return queryParams.toString() ? `?${queryParams.toString()}` : "";
};

export const campaignApi = createFetchInstance(
  process.env.NEXT_PUBLIC_API_URL!
);
