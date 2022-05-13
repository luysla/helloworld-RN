import React, {
    useState,
    useRef,
} from 'react';
import { 
    SafeAreaView,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    View,
    Pressable,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const App = () => {

    const [ taskName, setTaskName ] = useState("");
    const [ arrayTask, setArrayTask ] = useState([]);
    const inputRef = useRef(null);

    const addNewTask = () => {
        if(taskName) {
            setArrayTask([
                ...arrayTask,
                taskName,
            ])
        }
        inputRef.current.clear();
        setTaskName("");
    }

    const deleteTask = (idTask) => {
        const newArray = arrayTask.filter((_,index) => idTask !== index);
        setArrayTask(newArray);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>TODO LIST</Text>

            <TextInput 
                ref={inputRef}
                style={styles.input}
                placeholder='Nome da tarefa'
                onChangeText={setTaskName}
                value={taskName}
            />

            <Button 
                onPress={() => addNewTask()}
                style={styles.buttonAdd}
                title="Adicionar"
                accessibilityLabel="Botão para adicionar nova tarefa"
            />

            <ScrollView style={styles.listTasks}>
                {
                    arrayTask.map((task, index) => {
                        return (
                            <View 
                                key={index}
                                style={styles.containerTitleTask}
                            >
                                <Text style={styles.titleTask}>
                                    {task}
                                </Text>
                                <Pressable onPress={() => deleteTask(index)}>
                                    <EvilIcons
                                        name="trash"
                                        size={30}
                                        color="#ff0000"
                                    />
                                </Pressable>
                                
                            </View>
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 100,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
    },
    input: {
        height: 45,
        marginTop: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 17,
    },
    listTasks: {
        marginTop: 20,
    },  
    containerTitleTask: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleTask: {
        margin: 10,
        fontSize: 17,
    },
})

export default App;
