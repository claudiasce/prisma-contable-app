import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    if (!requiredPermissions) {
      return true; // Si no se especifican permisos, se permite el acceso
    }

    const { user } = context.switchToHttp().getRequest();
    const userPermissions = user.permissions; // Ajusta la propiedad `permissions` según tu estructura de usuario
    // Verifica si el usuario tiene al menos uno de los permisos requeridos
    return userPermissions.some((permission) =>
      requiredPermissions.includes(permission),
    );
  }
}
