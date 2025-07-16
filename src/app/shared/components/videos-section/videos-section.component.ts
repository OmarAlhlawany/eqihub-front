import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videos-section',
  templateUrl: './videos-section.component.html',
  styleUrls: ['./videos-section.component.css'],
  imports: [TranslateModule, CommonModule],
  standalone: true,
})
export class VideosSectionComponent implements AfterViewInit {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef<HTMLDivElement>;

  videos = [
    { id: 'gY8q0PYAk9c' },
    { id: 'hIpYB9Tor8o' },
    { id: 'QUweU0-ReIY' },
    { id: 'E1A5pIZ6IYI' },
    { id: 'A27F8tbFVJM' },
    { id: 'Kadd8PlINwE' },
    { id: '0TZxsvyw4iE' },
    { id: 'WMa5sbOuUas' },
    { id: 'H45ohsT5CzQ' },
  ];

  ngAfterViewInit(): void {
    const container = this.scrollContainer.nativeElement;
    let speed = 0.5;
    let isHovering = false;

    container.addEventListener('mouseenter', () => {
      isHovering = true;
    });

    container.addEventListener('mouseleave', () => {
      isHovering = false;
    });

    // سحب بالماوس (ديسكتوب)
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.classList.add('dragging');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.classList.remove('dragging');
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.classList.remove('dragging');
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    });

    // ✨ دعم السحب في الموبايل
    let touchStartX = 0;
    let scrollStartLeft = 0;
    let isTouching = false;

    container.addEventListener('touchstart', (e) => {
      isTouching = true;
      touchStartX = e.touches[0].pageX;
      scrollStartLeft = container.scrollLeft;
    });

    container.addEventListener('touchmove', (e) => {
      if (!isTouching) return;
      const touchX = e.touches[0].pageX;
      const move = touchStartX - touchX;
      container.scrollLeft = scrollStartLeft + move;
    });

    container.addEventListener('touchend', () => {
      isTouching = false;
    });

    // Auto scroll loop
    const scroll = () => {
      if (!isHovering && !isDown && !isTouching) {
        container.scrollLeft += speed;

        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      requestAnimationFrame(scroll);
    };

    requestAnimationFrame(scroll);
  }

  getThumbnailUrl(id: string): string {
    return `https://img.youtube.com/vi/${id}/sddefault.jpg`;
  }

  getVideoUrl(id: string): string {
    return `https://www.youtube.com/watch?v=${id}`;
  }
}
