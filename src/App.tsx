import { useState } from "react";
import dollar from "/assets/icon-dollar.svg";
import person from "/assets/icon-person.svg";
import logo from "/assets/logo.svg";
import "./App.css";

const TipSelector: React.FC<{
  tip: number | null;
  setTip: React.Dispatch<React.SetStateAction<number | null>>;
}> = ({ setTip, tip }) => {
  return (
    <div className="flex flex-col gap-2 p-1 my-2">
      <p className="text-very-dark-cyan text-start">Select Tip %</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {[5, 10, 15, 25, 50].map((value) => (
          <button
            key={value}
            className={
              tip == value / 100
                ? "bg-strong-cyan text-very-dark-cyan font-bold p-2 rounded-md w-32"
                : "bg-very-dark-cyan text-tip-white p-2 rounded-md font-bold w-32"
            }
            onClick={() => {
              console.log(tip);
              setTip(tip == value ? null : value);
            }}
          >
            {value}%
          </button>
        ))}
        <input
          placeholder="Custom"
          className="w-32 rounded-sm text-very-dark-cyan bg-very-light-grayish-cyan placeholder:text-dark-grayish-cyan text-center focus:outline outline-2 outline-strong-cyan"
          onChange={(e) => {
            setTip(
              parseInt(e.target.value) >= 1 ? parseInt(e.target.value) : tip
            );
          }}
        />
      </div>
    </div>
  );
};

const ShowResult: React.FC<{
  title: string;
  subtitle: string;
  result: number;
}> = ({ title, subtitle, result }) => {
  const formatter = new Intl.NumberFormat("en-EU", {
    notation: "compact",
    style: "currency",
    currency: "EUR",
  });
  return (
    <div className="grid grid-cols-2">
      <div>
        <p className="text-tip-white text-start">{title}</p>
        <p className="font-light text-start text-grayish-cyan">{subtitle}</p>
      </div>
      <p className="text-4xl text-strong-cyan text-end pr-6">
        {formatter.format(result)}
      </p>
    </div>
  );
};

const Calculator: React.FC<
  {
    value: number | null;
    setValue: React.Dispatch<React.SetStateAction<number | null>>;
    tip: number | null;
    setTip: React.Dispatch<React.SetStateAction<number | null>>;
    people: number | null;
    setPeople: React.Dispatch<React.SetStateAction<number | null>>;
  } & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
> = ({ value, setValue, tip, setTip, people, setPeople, ...props }) => {
  const allValidInputs = [value, tip, people].reduce((acc, curr) => {
    return acc == false ? false : typeof curr == "number" && curr > 1;
  }, true);

  return (
    <div className="w-[20em] sm:w-[28em] mt-4 sm:mt-0 grid grid-rows-[1fr_1fr_0.9fr] bg-very-dark-cyan rounded-lg px-4 py-6 ">
      <div className="pb-4">
        <ShowResult
          title={"Tip Amount"}
          subtitle={"/ person"}
          result={allValidInputs ? ((tip! / 100) * value!) / people! : 0}
        />
      </div>
      <div className="pb-10">
        <ShowResult
          title={"Total"}
          subtitle={"/ person"}
          result={
            allValidInputs ? (value! + value! * (tip! / 100)) / people! : 0
          }
        />
      </div>
      <div className="pt-6">
        <button
          className="text-very-dark-cyan rounded-md bg-strong-cyan font-bold w-full h-[3em]"
          onClick={() => {
            setTip(0);
            setValue(0);
            setPeople(null);
          }}
        >
          RESET
        </button>
      </div>
    </div>
  );
};

const InputValue: React.FC<{
  setValue: React.Dispatch<React.SetStateAction<number | null>>;
}> = ({ setValue }) => {
  return (
    <div className="mb-4">
      <p className="text-very-dark-cyan text-start">Bill</p>
      <input
        style={{
          backgroundImage: `url(${dollar})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "5%",
        }}
        className="w-full text-very-dark-cyan bg-very-light-grayish-cyan text-end px-4 py-2 rounded-sm focus:outline outline-2 outline-strong-cyan"
        onChange={(e) => {
          setValue(parseInt(e.target.value));
        }}
      />
    </div>
  );
};

const SetPeople: React.FC<{
  setPeople: React.Dispatch<React.SetStateAction<number | null>>;
  people: number | null;
}> = ({ setPeople, people }) => {
  return (
    <div className="mt-4">
      <label>
        <div className="flex justify-between">
          <p className="text-very-dark-cyan">Number of People</p>
          {people == 0 ? <p className="text-[tomato]">Can't be zero</p> : null}
        </div>
        <input
          type="number"
          min={1}
          style={{
            backgroundImage: `url(${person})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "5%",
            MozAppearance: "textfield",
          }}
          className="w-full appearance-none px-4 py-2 text-end rounded-sm bg-very-light-grayish-cyan text-very-dark-cyan placeholder:text-dark-grayish-cyan invalid:outline-2 invalid:outline-red-400 focus:outline outline-2 outline-strong-cyan"
          onChange={(e) => {
            //todo change class when error
            setPeople(
              parseInt(e.target.value) != 0 ? parseInt(e.target.value) : 0
            );
          }}
        />
      </label>
    </div>
  );
};
const SplitterApp: React.FC = () => {
  const [value, setValue] = useState<number | null>(null);
  const [tip, setTip] = useState<number | null>(null);
  const [people, setPeople] = useState<number | null>(null);
  return (
    <>
      <div className="p-4 w-[20em] sm:w-[28em]">
        <InputValue setValue={setValue} />
        <TipSelector tip={tip} setTip={setTip} />
        <SetPeople setPeople={setPeople} people={people} />
      </div>
      <Calculator
        value={value}
        setValue={setValue}
        tip={tip}
        setTip={setTip}
        people={people}
        setPeople={setPeople}
      />
    </>
  );
};

function App() {
  return (
    <div className="grid grid-rows-[1fr_auto_0.8fr] w-full h-full justify-items-center items-center">
      <div className="h-10">
        <img src={logo} alt="" />
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] w-full">
        <div className="grid rounded-lg w-[22em] bg-white sm:w-[58em] col-start-2 sm:grid-cols-[repeat(auto-fit,28em)] justify-self-center p-4">
          <SplitterApp />
        </div>
      </div>
    </div>
  );
}

export default App;
