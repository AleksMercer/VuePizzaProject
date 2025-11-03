export class HttpClient {
  /*
		Конструктор принимает параметры:
		* httpProvider — провайдер, который будет выполнять подключение
		* getToken — функция для получения токена аутентификации
		* baseUrl — базовый URL для конкретного ресурса
  */
  constructor(options) {
    if (!options.baseURL) {
      throw Error("[HttpClient]: Base url is empty");
    }
    this.httpProvider = options.httpProvider;
    this.getToken = options.getToken;
    this.baseUrl = options.baseURL;
  }

  buildRequest(options = {}) {
    const token = this.getToken();

    let headers = {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
    if (options.headers) {
      headers = {
        ...headers,
        ...options.headers,
      };
    }

    return {
      baseUrl: this.baseUrl,
      headers,
      ...options,
    };
  }

  checkPath(path) {
    if (!path.startsWith("/")) {
      throw Error("Путь должен начинаться с /", path);
    }
  }

  async get(path, options) {
    this.checkPath(path);
    return await this.httpProvider.get(path, this.buildRequest(options));
  }

  async post(path, options) {
    this.checkPath(path);
    return await this.httpProvider.post(path, this.buildRequest(options));
  }

  async put(path, options) {
    this.checkPath(path);
    return await this.httpProvider.put(path, this.buildRequest(options));
  }

  async delete(path, options) {
    this.checkPath(path);
    return await this.httpProvider.delete(path, this.buildRequest(options));
  }
}
