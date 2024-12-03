import { Component } from '@angular/core';
import { ActivityComponent } from '../../shared/activity/activity.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ActivityComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  activities = [
    { name: 'FootBall', image: 'assets/futsal.png', color: 'bg-green-800' },
    { name: 'Running', image: 'assets/running.png', color: 'bg-red-600' },
    { name: 'Swimming', image: 'assets/swimming.png', color: 'bg-blue-700' },
    { name: 'Basketball', image: 'assets/basketball.png', color: 'bg-orange-600' },
    { name: 'Judo', image: 'assets/judo.png', color: 'bg-red-800' },
    { name: 'Volleyball', image: 'assets/volleyball.png', color: 'bg-yellow-500' },
    { name: 'Ping-Pong', image: 'assets/pingpong.png', color: 'bg-teal-700' },
  ];
}
