//
import { AbilityBuilder, createMongoAbility, ExtractSubjectType, InferSubjects, MongoAbility } from '@casl/ability';
import { User, UserRole } from '../../users/entities/user.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Injectable } from '@nestjs/common';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = | InferSubjects<typeof User | typeof Appointment | 'all'>
// export type AppAbility = typeof Appointment | typeof User | typeof User[];

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build} = new AbilityBuilder(createMongoAbility)

    switch (user.role) {
      case UserRole.ADMIN:
        can(Action.Manage, 'all')
        break
      case UserRole.DOCTOR:
        can(Action.Read, User)
        can(Action.Update, User, {id: user.id})
        cannot(Action.Delete, User)

        can(Action.Manage, Appointment, {doctorId: user.id})
        can(Action.Create, Appointment)
        can(Action.Read, Appointment, {doctorId: user.id})
        break
      default:
        break
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>
    });
  }
}
