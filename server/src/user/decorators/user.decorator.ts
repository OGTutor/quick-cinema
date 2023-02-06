import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TypeData } from './user.decorator.interface';

export const User = createParamDecorator(
	(data: TypeData, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest();
		const user = request.user;

		return data ? user[data] : user;
	}
);
