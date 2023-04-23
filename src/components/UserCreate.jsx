import { useForm } from "react-hook-form";

const UserCreate =() => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
     
    return (
      <form className="register-form" onSubmit={handleSubmit(onSubmit)} >
        <label for="pseudo">Nom d'utilisateur : </label>
        <input name="pseudo" {...register("pseudo")} />
        <label for="password">Mot de passe : </label>
        <input name="password" type="password" {...register("password")} />
        <label for="email">Email : </label>
        <input name="email" type="email" {...register("email")} />
        <label name="localisation" for="email">Ville : </label>
        <input name="localisation" {...register("localisation")} />
        <input type="submit" />
      </form>
    );
  }

export default UserCreate;