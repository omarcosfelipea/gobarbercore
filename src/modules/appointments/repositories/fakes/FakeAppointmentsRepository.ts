import { v4 as uuid } from 'uuid';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../../infra/typeorm/entities/Appointments';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointnments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointments = this.appointnments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointments;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointnments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
