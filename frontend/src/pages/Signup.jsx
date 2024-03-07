import { Header } from '../components/Header'
import { InputBox } from '../components/InputBox'
import { SubHeading } from '../components/SubHeading'


export function Signup(){
    return(
        // <div className=''>
        //     <Header text='Signup' />
        //     <SubHeading text='Fill in the boxes to submit'/>
        //     <form>
                
        //         <div className='grid gap-6 mb-6 md:grid-cols-2'>
        //             <InputBox label='First Name' placeholder='John' />
        //             <InputBox label='Last Name' placeholder='Doe' />
        //             <InputBox label='Username' placeholder='johndoe123' />
        //             <InputBox label='Password' placeholder='••••••••' />
        //         </div>
        //     </form>
        // </div>
        <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Header label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox placeholder="John" label={"First Name"} />
        <InputBox placeholder="Doe" label={"Last Name"} />
        <InputBox placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox placeholder="123456" label={"Password"} />
      </div>
    </div>
  </div>
    )
}