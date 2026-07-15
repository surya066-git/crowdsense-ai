import { randomUUID } from 'crypto';
import { validate as validateUuid } from 'uuid';

export const requestId = (req, res, next) => {
  const incomingRequestId = req.get('X-Request-Id');
  const id =
    incomingRequestId && validateUuid(incomingRequestId) ? incomingRequestId : randomUUID();

  req.id = id;
  res.setHeader('X-Request-Id', id);

  next();
};
