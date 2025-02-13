const {Users} = require('./Models');


async function CreateUser(Username, Password) {
    try{
        await Users.create({
            Id: null,
            Username: Username,
            Password: Password,
            Contas: 0
        }).then(() => console.log('Usuário Criado'));
    } catch (err) {
        console.error('Error -> '+ err);
    }
}

async function ReadUser(All, Username) {
    try{
        if(!All){
            const User = await Users.findOne({where: {Username: Username}});
            if(User){
                console.log('Usuário Encontrado!');
                return User;
            } else {
                console.log('Nenhum Usuário Encontrado!');
                return null;
            }
        } else {
            const User = await Users.findAll();
            if(User.length > 0){
                console.log('Usuários Encontrados!');
                return User;
            } else {
                console.log('Nenhum Usuário Encontrado!');
                return null;
            }
        }
    } catch (err) {
        console.error('Error -> '+ err);
    }
}

async function UpdateUser(UserId, Username, Password) {
    try {
        if(Username && !Password){
            const Atualizado = await Users.update(
                {Username: Username},
                {where: {Id: UserId}}
            )
            if(Atualizado > 0){
                console.log('Usuário atualizado!');
                return true;
            } else {
                console.log('Nenhum usuário encontrado!');
                return false;
            }
        } else if(Password && !Username){
            const Atualizado = await Users.update(
                {Password: Password},
                {where: {Id: UserId}}
            )
            if(Atualizado > 0){
                console.log('Usuário atualizado!');
                return true;
            } else {
                console.log('Nenhum usuário encontrado!');
                return false;
            }
            } else {
            const Atualizado = await Users.update(
                {Username: Username, Password: Password},
                {where: {Id: UserId}}
            )
            if(Atualizado > 0){
                console.log('Usuário atualizado!');
                return true;
            } else {
                console.log('Nenhum usuário encontrado!');
                return false;
            }
        }
    } catch (err) {
        console.error('Error -> '+ err);
    }
}

async function DeleteUser(UserId) {
    try {
        const Deletado = await Users.destroy({where: {Id: UserId}});
        if(Deletado > 0){
            console.log('Usuário excluido!');
            return true;
        } else {
            console.log('Nenhum usuário encontrado!');
            return false;
        }
    } catch (err) {
        console.error('Error -> '+ err);
    }
}

module.exports = {CreateUser, ReadUser, UpdateUser, DeleteUser};
