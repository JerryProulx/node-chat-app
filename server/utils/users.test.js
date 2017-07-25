var expect = require('expect');
var {Users} = require('./users');

describe('Users', () => {
  var users = [];

  beforeEach(() => {
    users = new Users();
    users.users =[
      {
        id: '1',
        name: 'Mike',
        room: 'Node Course'
      },
      {
        id: '2',
        name: 'John',
        room: 'Diablo 3'
      },
      {
        id: '3',
        name: 'Jerry',
        room: 'Node Course'
      }
    ];
  });

  it('should add new user', () => {
    var users = new Users();

    var user = {
      id: '123',
      name: 'Jerry',
      room: 'Office'
    }
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
    expect(resUser).toEqual(user);
  });

  it('should return names for node course', ()=> {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'Jerry']);
  });

  it('should return names for Diablo 3', ()=> {
    var userList = users.getUserList('Diablo 3');

    expect(userList).toEqual(['John']);
  });

  it('should find user with matching id', ()=> {
    var id = '1';
    var user = users.getUser(id);

    expect(user.id).toEqual(id);
  });

  it('should not find user with no matching id', ()=> {
    var id = '5';
    var user = users.getUser(id);

    expect(user).toNotExist();
  });

  it('should remove user', ()=> {
    var id = '1';
    var user = users.removeUser(id);

    expect(user.id).toEqual(id);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', ()=> {
    var user = users.removeUser('5');

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });
});
