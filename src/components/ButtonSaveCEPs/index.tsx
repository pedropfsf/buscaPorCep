// Core
import { useState, useCallback } from "react";

// Components
import { 
  View, 
  Modal, 
  Pressable
} from "react-native";
import ListCEPsSave from "../ListCEPsSave";

// Icons
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// Styles
import styles from "./styles";
import colors from "../../styles/colors";

let timerShowModal: NodeJS.Timeout;
let timerHiddenModal: NodeJS.Timeout;
const MILISECONDS = 200;

export default function ButtonSaveCEPs() {
  const [ colorButtonShow, setColorButtonShow ] = useState(colors.secondary);
  const [ colorButtonHidden, setColorButtonHidden ] = useState(colors.danger);
  const [ isOpenModal, setIsOpenModal ] = useState(false);

  const handleShowModal = useCallback(() => {
    setColorButtonShow(`${colors.secondary}90`);
    clearTimeout(timerShowModal);
    timerShowModal = setTimeout(() => {
      setColorButtonShow(colors.secondary);
    }, MILISECONDS);

    setIsOpenModal(true);

  }, [MILISECONDS]);

  const handleHiddenModal = useCallback(() => {
    setColorButtonHidden(`${colors.danger}90`);
    clearTimeout(timerHiddenModal);
    timerHiddenModal = setTimeout(() => {
      setColorButtonHidden(colors.danger);
    }, MILISECONDS);

    setIsOpenModal(false);

  }, [MILISECONDS]);

  return (
    <>
      <View style={styles.buttonShowModal}>
        <Pressable onPress={handleShowModal}>
          <Feather 
            name="save" 
            size={40} 
            color={colorButtonShow} 
          />
        </Pressable>
      </View>
      <Modal 
        visible={isOpenModal} 
        animationType="fade"
        transparent={true}
      >
        <View style={styles.container}>
          <View style={styles.buttonHiddenModal}>
            <Pressable onPress={handleHiddenModal}>
              <AntDesign 
                name="closecircle" 
                size={40} 
                color={colorButtonHidden} 
              />
            </Pressable>
          </View>
          <ListCEPsSave setIsOpenModal={setIsOpenModal}/>
        </View>
      </Modal>
    </>
  )
}