export type TestConnectivityResult = {
  // 是否成功
  status: boolean;
  // 响应时间(单位: 毫秒)
  latency: number;
  // 响应体大小(单位: 字节)
  dataSizeInBytes: number;
}

export async function testConnectivity(url: string): Promise<TestConnectivityResult> {
  const startTime = Date.now();
  try {
    const response = await fetch(url, {cache: "no-cache"});
    const endTime = Date.now();
    const data = await response.text();
    const dataSizeInBytes = new TextEncoder().encode(data).length;
    const latency = endTime - startTime;
    return {
      status: true,
      latency,
      dataSizeInBytes,
    }
  } catch (error) {
    return Promise.resolve({
        status: false,
        latency: Date.now() - startTime,
        dataSizeInBytes: 0,
      }
    )
  }
}
