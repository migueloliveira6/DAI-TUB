import React, { useState } from 'react';
import { EyeIcon,EyeOffIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/tub.svg";
import { fetchUserCredentials, postUserCredentials } from '../services/UsersManagment';


export function Login(){
  const [userid, setUserId] = useState<string>('');
  const [numeroCC, setNumeroCC] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        //await postUserCredentials(Number(userid), numeroCC);
        // const loginMessage = await fetchUserCredentials(Number(userid), numeroCC);
        // console.log(loginMessage)
        // if(loginMessage == "Credenciais Validas"){
        //   console.log(loginMessage);
        //   navigate('/linhas',{state : {numeroT: userid}});
        // }else{
        //   setError('Erro ao fazer login. Por favor, verifique suas credenciais.')
        // }
    } catch (err) {
        console.error(err);
        setError('Erro ao fazer login. Por favor, verifique suas credenciais.');
    }
};

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#171717]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center flex-col items-center flex justify-center">
          <img src={logo} width={150} alt="TUB Logo"/>
          Login       
        </h2>
        <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-6">
            <label htmlFor="userid" className="block text-neutral-950 font-bold">Número de Trabalhador</label>
            <input
              type="string"
              id="userid"
              className="w-full px-4 py-2 mt-2 border rounded-lg shadow-md mb-4 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Digite número de Trabalhador"
              value={userid}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="numerocc" className="block text-neutral-950 font-bold">Número de CC</label>
            <input
              type={showPassword ? "text" : "password"}
              id="numerocc"
              className="w-full px-4 py-2 mt-2 border rounded-lg shadow-md mb-4 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Digite número de CC"
              value={numeroCC}
              onChange={(e) => setNumeroCC(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer mt-4"
              onClick={toggleShowPassword}
            >
              {showPassword ? <EyeOffIcon/> : <EyeIcon/>}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

