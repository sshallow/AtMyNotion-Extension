// fetch.js
interface FetchConfig {
  url: string
  method?: "GET" | "POST" | "PUT" | "DELETE"
  headers?: { [key: string]: string }
  body?: any
}

async function fetchClient(fetchConfig: FetchConfig) {
  const { url, method = "POST", headers = {}, body = null } = fetchConfig

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      body: body ? JSON.stringify(body) : null
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // 根据需要处理和返回响应，例如 JSON 或其他格式
    return await response.json()
  } catch (error) {
    console.error("Error making a fetch:", error)
    throw error
  }
}

export default fetchClient
