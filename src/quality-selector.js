// quality-selector.js

class QualitySelector {
    constructor(player) {
        this.player = player;
        this.qualityLevels = player.qualityLevels();
        this.dropdown = this.createDropdown();
        this.listenForQualityChange();
    }

    // Create dropdown menu
    createDropdown() {
        const dropdown = document.createElement('select');
        this.qualityLevels.on('change', () => this.updateDropdown(dropdown));
        this.updateDropdown(dropdown);
        dropdown.addEventListener('change', () => {
            const selectedQuality = dropdown.value;
            this.qualityLevels.selectedIndex = Array.from(dropdown.options).findIndex(option => option.value === selectedQuality);
        });
        return dropdown;
    }

    // Update dropdown options based on available quality levels
    updateDropdown(dropdown) {
        dropdown.innerHTML = '';
        this.qualityLevels.levels_.forEach(level => {
            const option = document.createElement('option');
            option.value = level.height;
            option.textContent = level.height + 'p';
            dropdown.appendChild(option);
        });
    }

    // Listen for quality changes
    listenForQualityChange() {
        this.qualityLevels.on('change', () => {
            const selectedIndex = this.qualityLevels.selectedIndex;
            const currentQuality = this.qualityLevels.levels_[selectedIndex].height;
            this.dropdown.value = currentQuality;
        });
        this.player.el().appendChild(this.dropdown);
    }
}

// Register the component with video.js
videojs.registerComponent('QualitySelector', QualitySelector);