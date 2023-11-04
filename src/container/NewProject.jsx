import { FaChevronDown, FaHtml5 } from "react-icons/fa6";
import { MdCheck, MdEdit, MdSettings } from "react-icons/md";
import SplitPane from "react-split-pane";
import { TiCss3 } from "react-icons/ti";
import { RiJavascriptFill } from "react-icons/ri";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import UserProfileDetails from "../components/UserProfileDetails";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import Alert from "../components/Alert";

const NewProject = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");
  const [title, setTitle] = useState("Untitled");
  const [alert, setAlert] = useState(false);
  const [isTitle, setisTitle] = useState("");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    updateOutput();
  }, [html, css, js]);

  const updateOutput = () => {
    const combinedOutput = `
    <html>
    <head>
    <style>${css}</style>
    </head>
    <body>
    ${html}
    <script>${js}</script>
    </body>
    </html>
    `;
    setOutput(combinedOutput);
  };

  const saveProgram = async () => {
    const id = `${Date.now()}`
    const _doc = {
      id : id,
      title: title,
      html: html,
      css: css,
      js: js,
      output: output,
      user: user,
    }
    await setDoc(doc(db, "Projects", id), _doc).then((res) => {
      setAlert(true)})
      .catch((err) => console.log(err))

      setInterval(() => {
        setAlert(false);
      },2000);
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
        {/* alert section */}
        <AnimatePresence>
          {alert && <Alert status={"Success"} alertMsg={"Project Saved...."}/>}
        </AnimatePresence>

        {/* header section */}
        <header className="w-full flex items-center justify-between px-12 py-4">
          <div className="flex items-center justify-center gap6">
            <Link to={"/home/projects"} className="flex ">
              <img src={Logo} alt="Logo" width={60} height={60} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <h1
                  style={{ position: "relative", color: "white", top: "08px" }}
                >
                  TextMate
                </h1>
                <h1
                  style={{ position: "relative", color: "white", top: "08px" }}
                >
                  Editor
                </h1>
              </div>
            </Link>
            <div className="flex flex-col items-start">
              {/* title */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center justify-between gap-3">
                  <AnimatePresence>
                    {isTitle ? (
                      <>
                        <motion.input
                          style={{
                            position: "relative",
                            left: "20px",
                            borderRadius: "10px",
                          }}
                          key={"TitleInput"}
                          className="px-3 py-2 rounded-md bg-transparent text-primaryText text-base outline-none border-none"
                          type="text"
                          placeholder="Your Title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </>
                    ) : (
                      <>
                        <motion.p
                          key={"titleLabel"}
                          className="px-3 py-2 text-white text-lg"
                        >
                          {isTitle}
                        </motion.p>
                      </>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {isTitle ? (
                      <>
                        <motion.div
                          key={"MdCheck"}
                          whileTap={{ scale: 0.9 }}
                          className="cursor-pointer"
                          onClick={() => setisTitle(false)}
                        >
                          <MdCheck className="text-2xl text-emerald-500" />
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <motion.div
                          key={"MdEdit"}
                          whileTap={{ scale: 0.9 }}
                          className="cursor-pointer"
                          onClick={() => setisTitle(true)}
                        >
                          <MdEdit className="text-2xl text-primaryText" />
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* follow */}
              <div>
                <div className="flex items-center justify-center px-3 mt-2 gap-2">
                  <p className="text-primaryText text-sm">
                    {/* {user?.displayName
                      ? user?.displayName
                      : `${user?.email.split("@")[0]}`} */}
                      Untitled
                  </p>
                  <motion.p className="text-[12px] bg-emerald-500 rounded-sm px-2.5 py-[1.5px] text-primary font-semibold cursor-pointer">
                    + Follow
                  </motion.p>
                </div>
              </div>
            </div>
            {/* user section */}
            {user && (
              <div className="h-full flex items-center justify-center gap-4">
                <motion.button
                  onClick={saveProgram}
                  whileTap={{ scale: 0.9 }}
                  className="px-6 py-4 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md"
                >
                  Save
                </motion.button>
                <UserProfileDetails />
              </div>
            )}
          </div>
        </header>

        {/*  coding section */}
        <div>
          {/* horizontal section */}
          <SplitPane
            split="horizontal"
            minSize={100}
            maxSize={-100}
            defaultSize={"50%"}
          >
            {/* top coding section */}
            <SplitPane split="vertical" minSize={500}>
              {/* html code */}
              <div className="w-full h-full flex flex-col items-start justify-start">
                <div className="w-full flex items-center justify-between">
                  <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                    <FaHtml5 className="text-xl text-red-500" />
                    <p className="text-primaryText font-semibold">HTML</p>
                  </div>
                  {/* ICONS */}
                  <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                    <MdSettings className="text-xl" />
                    <FaChevronDown className="text-xl text-primaryText" />
                  </div>
                </div>
                <div className="w-full px-2">
                  <CodeMirror
                    value={html}
                    height="600px"
                    theme="dark"
                    extensions={[javascript({ jsx: true })]}
                    onChange={(value, viewUpdate) => {
                      setHtml(value);
                    }}
                  />
                  ;
                </div>
              </div>
              <SplitPane split="vertical" minSize={500}>
                {/* CSS CODE */}
                <div className="w-full h-full flex flex-col items-start justify-start">
                  <div className="w-full flex items-center justify-between">
                    <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                      <TiCss3 className="text-xl text-sky-500" />
                      <p className="text-primaryText font-semibold">CSS</p>
                    </div>
                    {/* ICONS */}
                    <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                      <MdSettings className="text-xl" />
                      <FaChevronDown className="text-xl text-primaryText" />
                    </div>
                  </div>
                  <div>
                    <div className="w-full px-2">
                      <CodeMirror
                        value={css}
                        height="600px"
                        theme="dark"
                        extensions={[javascript({ jsx: true })]}
                        onChange={(value, viewUpdate) => {
                          setCss(value);
                        }}
                      />
                      ;
                    </div>
                  </div>
                </div>
                {/* js code */}
                <div className="w-full h-full flex flex-col items-start justify-start">
                  <div className="w-full flex items-center justify-between">
                    <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                      <RiJavascriptFill className="text-xl text-yellow-500" />
                      <p className="text-primaryText font-semibold">JSL</p>
                    </div>
                    {/* ICONS */}
                    <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                      <MdSettings className="text-xl" />
                      <FaChevronDown className="text-xl text-primaryText" />
                    </div>
                  </div>
                  <div>
                    <div className="w-full px-2">
                      <CodeMirror
                        value={js}
                        height="600px"
                        theme="dark"
                        extensions={[javascript({ jsx: true })]}
                        onChange={(value, viewUpdate) => {
                          setJs(value);
                        }}
                      />
                      ;
                    </div>
                  </div>
                </div>
              </SplitPane>
            </SplitPane>
            {/* bottom result section */}
            <div
              className="bg-white"
              style={{ overflow: "hidden", height: "100%" }}
            >
              <iframe
                title="Result"
                srcDoc={output}
                style={{ border: "none", width: "100%", height: "100%" }}
              />
            </div>
          </SplitPane>
        </div>
      </div>
    </>
  );
};

export default NewProject;
