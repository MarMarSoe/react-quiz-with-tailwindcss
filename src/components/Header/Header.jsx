import logoImg from "../../assets/quiz-logo.png";

export default function Header(){
    return(
        <div>
            <img src={logoImg} alt="logoImg" class="h-12 w-12 mx-auto pt-2"/>
            <h1 class="text-purple-500 text-center">React Quiz</h1>
        </div>
    )
}