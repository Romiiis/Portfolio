import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgClass } from '@angular/common';

interface Project {
  name: string;
  shortDescription: string;
  longDescription: string;
  projectUrl?: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass
  ],
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  selectedProjectIndex: number | null = null;
  expandedProjectIndex: number | null = null;
  detailsAnimating: boolean = false;

  projects: Project[] = [
    {
      "name": "ChessMaster",
      "shortDescription": "A chess game developed in Java Swing.",
      "longDescription": "These Chess were developed as part of a semester project for the course KIV/UPG. The game is written entirely in Java Swing, utilizing a library for statistics, and the Stockfish engine (https://stockfishchess.org/) is used as the opponent. All graphics were created directly in the code. This project achieved second place in the entire year and was also my first major development project.",
      "projectUrl": "https://github.com/Romiiis/ChessMaster"
    },
    {
      "name": "Digital Steganography",
      "shortDescription": "Hide secret messages in digital images.",
      "longDescription": "This project was developed as part of a semester assignment for the course KIV/PC. The program is capable of hiding data within the pixels of an image (PNG, BMP) and subsequently extracting it back. It also verifies whether the content fits into the image and detects if the content is corrupted. The course supervisor used this semester project to test a validator, which was later used to evaluate the work of other students.",
      "projectUrl": "https://github.com/Romiiis/Digital-steganography"
    },
    {
      "name": "Crazy Tags",
      "shortDescription": "A lightweight and simple minecraft plugin.",
      "longDescription": "This plugin was developed for fun and to learn the Spigot library for Minecraft plugin development. It uses Vault for economy and SQL (MySQL and SQLite). The plugin allows you to define various tags, their prices, and rarities in the configuration, which players can obtain in the game. Once a tag is selected, it appears in front of the player's name in the chat.",
      "projectUrl": "https://github.com/Romiiis/CrazyTags"
    },
    {
      "name": "Pseudo FAT File System",
      "shortDescription": "A pseudo FAT file system developed in C++.",
      "longDescription": "This project was created as part of the KIV/ZOS course. The program is written in C++. Upon execution, it allows you to format a file system of any size, and then perform basic commands (similar to Linux commands) within this system. After closing the program, you can reopen the existing file system and continue working."
    },
    {
      "name": "Super Mancala",
      "shortDescription": "Multiplayer Mancala game (Java&C++).",
      "longDescription": "This project was created as a semester assignment for the KIV/UPS course. It consists of two applications (Client & Server). The client is written in Java Swing and provides a simple and intuitive GUI for connecting to the server, logging in with a nickname, and joining a queue where the player waits for a game. Once an opponent is found, both players are placed into a game and can start playing. If connection issues occur during the game, the player has 30 seconds to reconnect. The server handles all the game logic."
    },
    {
      "name": "Office reservation system",
      "shortDescription": "A system for booking office spaces. (Made at work)",
      "longDescription": "This project is an internal project at work, developed in Swing framework, that allows designing rooms within a building, and users can then select and reserve desired desks for specific dates. All information is immediately added to the user's calendar (Office 365). The entire application is designed as a MicroService and utilizes OpenAPI."
    },
    {
      "name": "Quiz Master",
      "shortDescription": "A web application for creating quizzes for job fairs and recruitments (Made at work)",
      "longDescription": "As part of this application, I worked on creating recruitment tests, generating URL links, setting the time during which candidates can complete the test, handling internet outages, and more. For evaluating open-ended questions, I researched AI models that could run on our machines and focused on creating effective prompts."
    }
  ];

  constructor() {}

  ngOnInit() {
    if (this.projects.length > 0) {
      this.selectProject(0);
      this.expandedProjectIndex = 0; // Expand first project in mobile view
    }
  }

  selectProject(index: number) {
    if (this.selectedProjectIndex === index) return;

    // Animate transition between project details
    if (this.selectedProjectIndex !== null) {
      this.detailsAnimating = true;
      setTimeout(() => {
        this.selectedProjectIndex = index;
        setTimeout(() => {
          this.detailsAnimating = false;
        }, 50);
      }, 300);
    } else {
      this.selectedProjectIndex = index;
    }
  }

  toggleAccordion(index: number) {
    this.expandedProjectIndex = this.expandedProjectIndex === index ? null : index;
  }
}
