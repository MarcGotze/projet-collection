import { useForm } from "react-hook-form";

const UserCreate =() => {
  const {handleSubmit, register, formState : {errors}} = useForm();
  function onSubmit(data) {
    console.log(data);
  }
   
     
    return (
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="pseudo">Nom d'utilisateur : </label>
        <input name="pseudo" {...register("pseudo", {required : true})}/>
        {errors.pseudo && <p>Le pseudo est requis</p>}
        <label htmlFor="password">Mot de passe : </label>
        <input name="password" type="password"{...register("password")}/>
        <label htmlFor="email">Email : </label>
        <input name="email" type="email"{...register("email")}/>
        <label name="localisation" htmlFor="email">Ville : </label>
        <input name="localisation" {...register("localisation")}/>
        <input type="submit" />
      </form>
    );
  }

export default UserCreate;