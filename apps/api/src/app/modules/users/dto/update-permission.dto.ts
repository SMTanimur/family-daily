import { IsEnum } from 'class-validator';
import { Role } from '../../../common/constants/role-enum';


export class UpdateUserPermissionsDto {
  @IsEnum(Role)
  public permissions: Role;
}
