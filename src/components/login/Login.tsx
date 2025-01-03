import Form from "./Form";
import CreateAccBtn from "./CreateAccBtn";

type Props = {
};

const Login = (props: Props) => {
  return (
    <section
      aria-label="login area"
      className="flex flex-col items-center justify-center p-6 bg-white rounded shadow-lg gap-6 w-96 xs:w-72"
    >
      <h2 className="text-neutral-600 font-bold">Login</h2>
      <Form />
      <CreateAccBtn />
    </section>
  );
};

export default Login;
