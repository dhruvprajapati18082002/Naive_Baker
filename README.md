# IT 314 Software Engineering Group Project

## *Group 08 Members*

- 202001062 - Boricha Vinal
- 202001089 - Priyank Pitliya
- 202001094 - Deep Rakhasiya
- 202001099 - Aditya Raj
- 202001100 - Shobhit Verma
- 202001103 0 Dhruv Prajapati
- 202001108 - Nikhil Jethanandani
- 202001110 - Vihar Shah
- 202001116 - Gaurav Shah

## *Repository Structure*

- The repository consists of two folders, *lab_assignments* and *project*.

- *lab_assignment* consists of all the group lab assignment reports to be submitted.

- *project* folder consists of the project code.

## *Project folder Structure*

- The project code is structured in two folders, namely, *public* and *src*.
- The *public* folder consists of all the **images** and **html** file for the website.
- The *src* folder consists of the **javascript** and **CSS** files.
- The *React code* for frontend and the *Node.JS* code for the backend are both included in this files.
- *package-lock.json* and *package.json* files consist of the node-modules needed to run the project and their corresponding versions. The node modules can easily be installed on any system using  following command in the same directory as *package.json*

```bash
npm install -r package.json
```

## **Components implemented*

All the reuseable components created in React are present in the *components* folder inside *src*.

The components implemented are described briefly as follows:

### **Navbar**

**Navbar.js** file consists of the navigation bar code of the website. The navbar component will be common in all the pages of the website.

### **RecipeItem**

The **RecipeItem.js** implements a card to display an recipe item in short. The *RecipeItem* component will be used to display the recipes when a user performs search operation or while displaying the daily specials recipe. One can redirect to the recipe page to view it in detail by clicking on the ***see recipe in detail*** button.
