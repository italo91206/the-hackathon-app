type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface ApiOptions<T> {
  method?: HttpMethod
  body?: T
  query?: Record<string, string | number | boolean>
}

export function useApi() {
  async function request<TResponse, TBody = unknown>(
    path: string,
    options: ApiOptions<TBody> = {},
  ): Promise<TResponse> {
    const { method = 'GET', body, query } = options

    const url = query
      ? `${path}?${new URLSearchParams(Object.entries(query).map(([k, v]) => [k, String(v)]))}` 
      : path

    const data = await $fetch<TResponse>(url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
    })

    return data
  }

  function get<TResponse>(path: string, query?: ApiOptions<never>['query']) {
    return request<TResponse>(path, { method: 'GET', query })
  }

  function post<TResponse, TBody>(path: string, body: TBody) {
    return request<TResponse, TBody>(path, { method: 'POST', body })
  }

  function put<TResponse, TBody>(path: string, body: TBody) {
    return request<TResponse, TBody>(path, { method: 'PUT', body })
  }

  function patch<TResponse, TBody>(path: string, body: TBody) {
    return request<TResponse, TBody>(path, { method: 'PATCH', body })
  }

  function del<TResponse>(path: string) {
    return request<TResponse>(path, { method: 'DELETE' })
  }

  return { request, get, post, put, patch, del }
}
