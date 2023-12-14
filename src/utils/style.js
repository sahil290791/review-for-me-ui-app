export const copyStyle = (source, target) => {
    const styles = window.getComputedStyle(source);

    let cssText = styles.cssText;
    
    if (!cssText) {
      cssText = Array.from(styles).reduce((str, property) => {
        return `${str}${property}:${styles.getPropertyValue(property)};`;
      }, '');
    }
    
    // 👇️ Assign CSS styles to the element
    target.style.cssText = cssText;
};