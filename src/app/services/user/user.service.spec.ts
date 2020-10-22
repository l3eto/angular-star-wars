import { TestBed } from '@angular/core/testing';
import { ApiResponse } from 'src/app/models/api-response';
import { User } from 'src/app/models/user';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let user: User;
  let apiResponse: ApiResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
    service.setUsers(null);
    user = new User();
    user.firstname = 'Luke';
    user.lastname = 'Skywalker';
    user.username = 'jedi';
    user.password = 'tatooine';
  });

  afterEach(() => {
    service = null;
    user = null;
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create: ApiResponse success with verify user', async () => {
    const response1: ApiResponse = await service.create(user);
    apiResponse = new ApiResponse(true, 'Usuario registrado correctamente.');
    expect(response1).toEqual(apiResponse);
    const response2: User = await service.getById(user.id);
    expect(JSON.stringify(response2)).toEqual(JSON.stringify(user));
  });

  it('create: ApiResponse error user already exists', async () => {
    await service.create(user);
    const response1: ApiResponse = await service.create(user);
    apiResponse = new ApiResponse(false, 'El usuario "' + user.username + '" ya existe.');
    expect(response1).toEqual(apiResponse);
  });

  it('create: ApiResponse error with null user', async () => {
    await service.create(user);
    const response1: ApiResponse = await service.create(null);
    apiResponse = new ApiResponse(false, 'Ha ocurrido un error en la creación.');
    expect(response1).toEqual(apiResponse);
    const response2: User = await service.getById(null);
    expect(response2).toBeNull();
  });

  it('getById: User found', async () => {
    await service.create(user);
    const response: User = await service.getById(user.id);
    expect(JSON.stringify(response)).toEqual(JSON.stringify(user));
  });

  it('getById: User not found', async () => {
    const response: User = await service.getById(null);
    expect(response).toEqual(null);
  });

  it('getByUsername: User found', async () => {
    await service.create(user);
    const response: User = await service.getByUsername(user.username);
    expect(JSON.stringify(response)).toEqual(JSON.stringify(user));
  });
  
  it('getByUsername: User not found', async () => {
    const response: User = await service.getByUsername(null);
    expect(response).toEqual(null);
  });

  it('delete: ApiResponse success with verify', async () => {
    await service.create(user);
    const response1: ApiResponse = await service.delete(user);
    apiResponse = new ApiResponse(true, 'Usuario eliminado correctamente.');
    expect(response1).toEqual(apiResponse);
    const response2: User = await service.getById(user.id);
    expect(response2).toBeNull();
  });

  it('delete: ApiResponse error user not found', async () => {
    const response: ApiResponse = await service.delete(user);
    apiResponse = new ApiResponse(false, 'El usuario no existe.');
    expect(response).toEqual(apiResponse);
  });

  it('update: ApiResponse success', async () => {
    await service.create(user);
    const response: ApiResponse = await service.update(user);
    apiResponse = new ApiResponse(true, 'Usuario actualizado correctamente.');
    expect(response).toEqual(apiResponse);
  });

  it('update: ApiResponse error', async () => {
    const response: ApiResponse = await service.update(user);
    apiResponse = new ApiResponse(false, 'El usuario no existe.');
    expect(response).toEqual(apiResponse);
  });

  it('getAll: verify avoid duplicates', async () => {
    const response1: User[] = await service.getAll();
    expect(response1.length).toBe(0);
    await service.create(user);
    const response2: User[] = await service.getAll();
    expect(response2.length).toBe(1);
    await service.create(user);
    const response3: User[] = await service.getAll();
    expect(response3.length).toBe(1);
  });

  
});
