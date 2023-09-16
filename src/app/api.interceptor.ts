import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if(token){
    const newReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(newReq);
  }
  return next(req);
};
