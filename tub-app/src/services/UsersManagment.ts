const url = "http://localhost:3000"; // URL da sua API


//Register
export async function postUserCredentials(numeroT: number, numeroCC: string){
  const response = await fetch(`${url}/api/users/register`, {
    method: "POST",
    body: JSON.stringify({ numeroT, numeroCC }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//Login
export async function fetchUserCredentials(numeroT: number, numeroCC: string): Promise<string> {
    try {
      const response = await fetch(`${url}/api/users/login`, {
        method: "POST",
        body: JSON.stringify({ numeroT, numeroCC }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao fazer login: ${response.status} - ${response.statusText}`);
      }
  
      // Aqui, você precisa retornar o conteúdo da resposta, que será a mensagem de login
      return await response.text();
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  }
