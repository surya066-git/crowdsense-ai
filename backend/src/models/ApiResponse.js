export class ApiResponse {
  static success({ message = 'Success', data = null, meta = undefined, requestId = undefined }) {
    const response = {
      success: true,
      message,
      data,
      requestId,
      timestamp: new Date().toISOString(),
    };

    if (meta) {
      response.meta = meta;
    }

    return response;
  }
}
